#valid
* future[meta header]
* std[meta namespace]
* shared_future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool valid() const noexcept;
```

##概要
共有状態を持っているか確認する


##戻り値
`*this`が共有状態を持っていれば`true`を返し、そうでなければ`false`を返す。


##例外
投げない


##例
```cpp
#include <cassert>
#include <future>

int main()
{
  std::promise<int> p;
  std::shared_future<int> f;

  assert(!f.valid()); // まだ共有状態を持っていない

  f = p.get_future().share();

  assert(f.valid()); // 共有状態を持っている
}
```
* valid[color ff0000]
* std::promise[link /reference/future/promise.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* share()[link /reference/future/future/share.md]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


