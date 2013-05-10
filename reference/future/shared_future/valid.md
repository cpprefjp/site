#valid
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

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


