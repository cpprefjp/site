#set_unexpected
```cpp
namespace std {
  typedef void (*unexpected_handler)();
  unexpected_handler set_unexpected (unexpected_handler f) throw();
}

 <b>概要</b>例外指定のある関数内で、指定外の例外が発生した時に呼び出される例外ハンドラの設定
関数に例外指定が行われている場合に、指定外の例外が発生した場合、この関数で指定したハンドラを呼び出すように設定することが出来るまた、ここで設定したハンドラは、プログラムから直接呼び出すことも出来る。定義外例外ハンドラでは、「処理を終了する」もしくは、「例外のthrow」を行う。何もthrowしない場合は、終了処理が呼び出されプログラムが終了する。throwする場合は、例外発生地点からのthrowと同等の扱いとなる。例外発生地点の関数の例外指定が影響するため、例外ハンドラ内で指定外の例外が発生した場合は、terminateが呼び出されプログラムが終了する。例外ハンドラ内には、カレントの例外として、bad_exceptionが渡されておりthrowを呼び出すことで、bad_exception、その他の例外を指定することで別の例外をthrowすることが出来る。例外ハンドラを設定しない場合、デフォルトでは、終了処理が発生する。
```

##戻り値

元設定されていた例外ハンドラを返す。


##例外



##計算量



##備考



##例

```cpp
#include <stdexcept>#include <iostream>void unexpected_handler(){    std::cout << "unexpected exception!" << std::endl;    throw;}void other_throw() throw( int, std::bad_exception ){    throw 1.0;}int main(){    std::set_unexpected( unexpected_handler );    try {        other_throw();    }    catch( std::bad_exception ) {        std::cout << "bad_exception." << std::endl;    }    return 0;}
```

###出力

```cpp
unexpected exception!bad_exception.
```

##バージョン


###言語



###処理系

(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```