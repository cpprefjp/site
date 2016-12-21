#set_unexpected
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11deprecated[meta cpp]

```cpp
namespace std {
  typedef void (*unexpected_handler)();
  unexpected_handler set_unexpected (unexpected_handler f) throw();
}
```

この関数はC++11から非推奨である。`throw`キーワードの代わりに使用する[`noexcept`キーワード](/lang/cpp11/noexcept.md)では、指定外の例外が発生することによるエラーは起こらない。

##概要
例外指定のある関数内で、指定外の例外が発生した時に呼び出される例外ハンドラを設定する。


##戻り値
元設定されていた例外ハンドラを返す。


##備考
関数に例外指定が行われている場合に、指定外の例外が発生した場合、この関数で指定したハンドラを呼び出すように設定することが出来る。

また、ここで設定したハンドラは、プログラムから直接呼び出すことも出来る。定義外例外ハンドラでは、「処理を終了する」もしくは、「例外の送出」を行う。

何も送出しない場合は、終了処理が呼び出されプログラムが終了する。送出する場合は、例外発生地点からの送出と同等の扱いとなる。例外発生地点の関数の例外指定が影響するため、例外ハンドラ内で指定外の例外が発生した場合は、`terminate()`が呼び出されプログラムが終了する。

例外ハンドラ内には、カレントの例外として、`bad_exception`が渡されておりthrowを呼び出すことで、`bad_exception`、その他の例外を指定することで別の例外を送出することが出来る。例外ハンドラを設定しない場合、デフォルトでは、終了処理が発生する。


##例

```cpp
#include <stdexcept>
#include <iostream>

void unexpected_handler()
{
    std::cout << "unexpected exception!" << std::endl;
    throw;
}

void other_throw() throw( int, std::bad_exception )
{
    throw 1.0;
}

int main()
{
    std::set_unexpected( unexpected_handler );

    try {
        other_throw();
    }
    catch( std::bad_exception ) {
        std::cout << "bad_exception." << std::endl;
    }

    return 0;
}
```

###出力
```
unexpected exception!
bad_exception.
```

##参照

