#代入演算子
```cpp
future& operator=(const future& rhs) = delete;
future& operator=(future&& rhs) noexcept;
```

##概要

- `future& operator=(const future& rhs) = delete;`コピー代入。コピー不可。
- `future& operator=(future&& rhs) noexcept;`ムーブ代入。効果： 共有状態を解放し、`rhs`の共有状態を含むコンテンツを`*this`にムーブ代入する。事後条件： [`valid()`](/reference/future/future/valid.md)の戻り値が、この関数を呼び出す前の`rhs.[valid()](/reference/future/future/valid.md)`と等価になること。`rhs.[valid()](/reference/future/future/valid.md) == false`になること。戻り値： `*this例外： 投げない`

##例

```cpp
#include <future>

int main()
{
  std::promise<int> p;
  std::future<int> f;
  f = p.get_future();
}
```

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


