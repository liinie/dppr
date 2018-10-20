from space_ship_env import EnvironmentGame
from space_ship_tutorial import simple_tasks


steps = 10
env_game = EnvironmentGame()
board = env_game.board
cur_state = env_game.start_state

print("Now Dr. Einstein has achieved to bend space in his secret lab by pressing only one key, \n"
      "so that the ship could be teleportated to the destination instantaneously. \n"
      "However, the instruction has been lost and you have to discover it by yourself.")

success = False

for i in range(steps):
    inpt = str(input("try new skills or use the mastered one?[y/n]"))

    if inpt == "y":
        # TODO: give the users the pseudo reward for choosing trying new skill
        action = "teleportation"
        trial = str(input("try some key out!>> "))
        if ord("z") >= ord(trial) >= ord("a"):
            if trial == "m":
                print("you've got the skill to teleportate your ship")
                success = True
                break
            else:
                print(f"error, please try again! {steps - i - 1} step(s) left!")
        else:
            raise ValueError

    elif inpt == "n":
        actions = [(0, 1), (-1, 0)]
        simple_tasks(success, env_game, steps, actions)

    else:
        raise ValueError

