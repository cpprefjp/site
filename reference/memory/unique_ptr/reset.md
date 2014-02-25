#reset(C++11)
```cpp
void reset(pointer p = pointer()) noexcept;
```

##概要
リソースを再初期化する。


##効果
保持しているポインタ変数に`p`を代入する。デフォルト引数を使用する場合、この関数を呼び出したあと`*this`はリソースを保持していない状態になる。

代入前に保持していたポインタ変数を`old_p`とし、それが`nullptr`でなければ、[`get_deleter()`](./get_deleter.md)`(old_p)`によって、以前保持していたポインタを解放する。


##戻り値
なし


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  // リソースを解放
  p.reset();
  if (!p) {
    std::cout << "p doesn't have resource" << std::endl;
  }

  // リソースを再設定
  p.reset(new int(2));
  std::cout << *p << std::endl;
}
```

###出力
```
p doesn't have resource
2
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
