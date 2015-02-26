#base (C++11)
* random[meta header]

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
  std::knuth_b engine;

  // 元となる乱数生成器を取得
  const std::minstd_rand0& base_engine = engine.base();
}
```
* knuth_b[link /reference/random/knuth_b.md]
* minstd_rand0[link /reference/random/minstd_rand0.md]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


