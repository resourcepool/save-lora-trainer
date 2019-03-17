import constant
import tempfile
import shutil
import subprocess
from git import Repo

tmpdir = tempfile.mkdtemp(suffix='player')
repodir = tmpdir + "/repo"

def init_with_resources():
    print("Copying resources to " + repodir)
    shutil.copytree("../../resources/boilerplate", repodir, ignore=shutil.ignore_patterns("node_modules"))
    shutil.copytree("../../resources/course", repodir + "/course")

def commit_and_push_force_master():
    repo = Repo.init(repodir)
    origin = repo.create_remote('origin', constant.GIT_REPO)
    assert origin.exists()
    repo.git.add("--all")
    repo.git.commit(message="Initial Commit")
    repo.git.push("-f", "origin", "master")

def clone_from_remote():
    repo = Repo.clone_from(constant.GIT_REPO, repodir)
    assert repo.__class__ is Repo

def deploy_solution(chapter, step):
    print("Copying solution from " + chapter + " / " + step)
    shutil.copytree("../../resources/solution/" + chapter + "/" + step, repodir + "/solution/" + chapter + "/" + step, ignore=shutil.ignore_patterns("node_modules"))
    repo = Repo(repodir)
    repo.git.add("--all")
    repo.git.commit(message="Added solution for " + chapter + " - " + step)
    repo.git.push("origin", "master")

def init_with_docs():
    print("Building docs")
    return_code = subprocess.call("cd ../../resources/docs && mkdocs build", shell=True)
    if (return_code != 0):
        exit(1)
    print("Copying resources to " + repodir)
    shutil.copytree("../../resources/docs/site", repodir)

def commit_and_push_force_ghpages():
    repo = Repo.init(repodir)
    origin = repo.create_remote('origin', constant.GIT_REPO)
    assert origin.exists()
    repo.git.add("--all")
    repo.git.commit(message="Initial Commit")
    repo.git.push("-f", "origin", "master:gh-pages")

def clear():
    global tmpdir
    global repodir
    tmpdir = tempfile.mkdtemp(suffix='player')
    repodir = tmpdir + "/repo"
