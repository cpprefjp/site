import sys
import code_qualify_check
import display_error_check
import global_qualify_check
import link_check
import meta_header_check
import ngword_check

if __name__ == '__main__':
    if not code_qualify_check.check():
        print("code_qualify_check failed")
        sys.exit(1)
    if not display_error_check.check():
        print("display_error_check failed")
        sys.exit(1)
    if not global_qualify_check.check():
        print("global_qualify_check failed")
        sys.exit(1)
    if not link_check.check_inner_link():
        print("link_check failed")
        sys.exit(1)
    if not meta_header_check.check():
        print("meta_header_check failed")
        sys.exit(1)
    if not ngword_check.check():
        print("ngword_check failed")
        sys.exit(1)
    print("All checks passed successfully.")

