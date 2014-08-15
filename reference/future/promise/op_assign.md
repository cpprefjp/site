#代入演算子 (C++11)
```cpp
promise& operator=(promise&& rhs) noexcept;
promise& operator=(const promise& rhs) = delete;
```

##概要
- `promise& operator=(promise&& rhs) noexcept;`<br/>ムーブ代入演算子。現在の共有状態を放棄し、`promise(std::`[`move`](/reference/utility/move.md)`(rhs)).swap(*this)`する。<br/>戻り値： `*this`
- `promise& operator=(const promise& rhs) = delete;`<br/>コピー代入演算子。コピー禁止。

##例
```cpp
#include <utility>
#include <future>

int main()
{
  std::promise<int> p1;
  std::promise<int> p2;
  p2 = std::move(p1);
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


