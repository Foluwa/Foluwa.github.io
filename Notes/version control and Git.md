
# Intro to git

## Git commands you are unfamiliar with 

 - git log --stat
 - git log
 git log -- oneline
 git diff
# git log -p
  # git tag 
    - [ Git tag lets you point out particular commits to help you label them  {for example you can tag a commit version 1.0} ]
            - git tag -a v1.0 [ he -a flag is used. This flag tells Git to create an annotated flag. If you don't provide the flag 
              (i.e. git tag v1.0) then it'll create what's called a lightweight tag. ]

         Annotated tags are recommended because they include a lot of extra information such as:

        the person who made the tag, the date the tag was made, a message for the tag.   Because of these reasons we usually annotated tags.

# Deleting a tag
    git tag -d v1.0

 git branch
 git checkout
 git merge
 git log --decorate

 git log --decorate




 Most of the time Git will be able to merge branches together without any problem. However, there are instances when a merge cannot be fully performed automatically. When a merge fails, it's called a merge conflict.

If a merge conflict does occur, Git will try to combine as much as it can, but then it will leave special markers (e.g. >>> and <<<) that tell you where you (yep, you the programmer!) needs to manually fix.

As you've learned, Git tracks lines in files. A merge conflict will happen when the exact same line(s) are changed in separate branches. For example, if you're on a alternate-sidebar-style branch and change the sidebar's heading to "About Me" but then on a different branch and change the sidebar's heading to "Information About Me", which heading should Git choose? You've changed the heading on both branches, so there's no way Git will know which one you actually want to keep. And it sure isn't going to just randomly pick for you!

Let's force a merge conflict so we can learn to resolve it. Trust me, it's simple once you get the hang of it! Remember that a merge conflict occurs when Git isn't sure which line(s) you want to use from the branches that are being merged. So we need to edit the same line on two different branches...and then try to merge them.

Forcing A Merge Conflict!
Remember that a merge conflict occurs when the exact same line(s) are changed in separate branches. Let's alter the page's heading on two different branches. So Let's:

change the heading on the master branch
create a heading-update branch that's located on the commit right before the recently modified master branch
change the same heading
switch back to the master branch
merge in the heading-update branch


_______________________________________________________________

UNDOING CHANGES IN GIT
 - git commit --amend
 - git revert
 - git reset


 ### git commit --amend
    git commit --amend to update the most-recent commit instead of creating a new one.
 ### git revert
 ### git reset


 width="211" height="120"