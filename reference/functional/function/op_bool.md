#operator bool (C++11)
```cpp
explicit operator bool() const noexcept;
```

##概要
関数呼び出しが可能か調べる。


##戻り値
呼び出す関数を持っていれば`true`、そうでなければ`false`を返す。


##例
```cpp
#include <iostream>
#include <functional>

int ident(int x) { return x; }

int main()
{
  std::function<int(int)> f = ident;

  if (f) {
    std::cout << "not empty" << std::endl;
  }
  else {
    std::cout << "empty" << std::endl;
  }
}
```

###出力
```
not empty
```


##バージョン
###言語
- C++11


###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


##参照

