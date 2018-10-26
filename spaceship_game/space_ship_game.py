from space_ship_env import EnvironmentGame
from space_ship_tutorial import simple_tasks


def advanced_task(success, env, steps):
    env.board_reset()
    for i in range(steps):
        inpt = str(input("try new skills or use the mastered one?[y/n]"))

        if inpt == "y":
            # TODO: give the users the pseudo reward for choosing trying new skill
            # actions[2]: "teleportation" is chosen, the key is "m"
            trial = str(input("try some key out!>> "))
            if ord("z") >= ord(trial) >= ord("a"):
                if trial == "m":
                    print("you've got the skill to teleport your ship")
                    success = True
                    break
                else:
                    print(f"error, please try again! {steps - i - 1} step(s) left!")
            else:
                raise ValueError

        elif inpt == "n":
            actions = [(0, 1), (-1, 0)]
            success = simple_tasks(success, env, (steps - i), actions, jump_out=True)
        else:
            raise ValueError
    return success


def call_advanced_task():
    success = False
    steps = 10
    env_game = EnvironmentGame()
    board = env_game.board
    cur_state = env_game.start_state
    env_game.show_board()
    actions = {"e": (0, 1), "t": (-1, 0), "m": "teleportation"}

    print("Now Dr. Einstein has achieved to bend space in his secret lab by pressing only one key, \n"
          "so that the ship could be teleported to the destination instantaneously. \n"
          "However, the instruction has been lost and you have to discover it by yourself.")

    success = advanced_task(success, env_game, steps)

    while not success:
        inpt = str(input("Game over, you lose, try again? [y/n]"))
        if inpt == "y":
            success = advanced_task(success, env_game, steps)
        elif inpt == "n":
            print("bye")
            break
        else:
            raise ValueError
    if success:
        print("well done! you've reached your goal")


if __name__ == '__main__':
    call_advanced_task()
