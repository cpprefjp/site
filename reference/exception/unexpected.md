#unexpected
* exception[meta header]
* std[meta namespace]

```cpp
namespace std {
  void unexpected();
}
```

##概要
例外指定のある関数内で、指定外の例外が発生した時に呼び出される例外ハンドラを直接呼び出す。

この関数を呼び出すと、例外ハンドラが呼ばれ、さらに終了ハンドラが呼び出され、アプリケーションは終了する。ハンドラ内で例外をthrowした場合は、unexpectedを呼び出した地点が、try-catch で処理されていればcatchすることが出来る。


##例

```cpp
#include <stdexcept>
#include <iostream>

void unexpected_handler()
{
  std::cout << "unexpected handler called" << std::endl;
}

int main()
{
  std::set_unexpected( unexpected_handler );
  std::unexpected();
}

```

###出力
```
unexpected handler called
<例外キャッチを行っていないので、アプリケーション自体が終了する>
```

