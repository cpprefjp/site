#base(C++11)
```cpp
const Engine& base() const noexcept;
```

##概要
元となる乱数生成器を取得する。


##戻り値
メンバ変数として保持している、元となる乱数生成器への`const`参照を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::ranlux24 engine;

  // 元となる乱数生成器を取得
  const std::ranlux24_base& base_engine = engine.base();
}
```
* ranlux24[link /reference/random/ranlux24.md]
* ranlux24_base[link /reference/random/ranlux24_base.md]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


