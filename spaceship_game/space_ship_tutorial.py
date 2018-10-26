from space_ship_env import EnvironmentTutorial


def simple_tasks(success, env, steps, actions, jump_out):

    if jump_out:
        cur_state = env.get_cur_state()
    else:
        env.board_reset()
        cur_state = env.start_state
    env.show_board()

    for i in range(steps):

        trial = str(input("try one key out!>> "))

        if ord("z") >= ord(trial) >= ord("a"):
            if trial == "e":
                print("you've got the skill to move your space ship up")
                print(f"{steps -i -1} move(s) left")
                new_state = env.step(cur_state, actions[1])
                cur_state = new_state
                env.set_cur_state(cur_state)
                board = env.env_update(cur_state)
                # env.show_board()
                if env.done(cur_state):
                    print("Well done, you made it!")
                    success = True
                    break
                print(board)
                if jump_out:
                    break

            elif trial == "t":
                print("you got the skill to move your space ship to the right")
                print(f"{steps - i - 1} move(s) left")
                new_state = env.step(cur_state, actions[0])
                cur_state = new_state
                env.set_cur_state(cur_state)
                board = env.env_update(cur_state)
                # env.show_board()
                if env.done(cur_state):
                    print("Well done, you made it!")
                    success = True
                    break
                print(board)
                if jump_out:
                    break

            else:
                print(f"error! {steps -i -1} move(s) left.")
                if jump_out:
                    break
        else:
            raise ValueError
    return success


def main():
    print(
        "try to type a key from [a-z] to find out how to control the app, you have 10 chances to move your spaceship!")
    success = False
    env = EnvironmentTutorial()
    board = env.board

    actions = [(0, 1), (-1, 0)]  # key "e" for action (0, 1) right, key "t" for action (-1, 0) up
    # states = ((x, y) for x in range(board.shape[0]) for y in range(board.shape[1]))
    steps = 10

    success = simple_tasks(success, env, steps, actions, jump_out=False)

    while not success:
        try_again = str(input("try again [y] or see the answer[n]"))
        if try_again == "y":
            success = simple_tasks(success, env, steps, actions, jump_out=False)
            # TODO: maybe call reward for trying out new things?
        elif try_again == "n":
            print("the answer: up: e, right t")
            break
        else:
            raise ValueError

    if success:
        print("Now you can start the game!")
        # TODO: call advanced tasks


if __name__ == '__main__':
    main()





