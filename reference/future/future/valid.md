#valid
* future[meta header]
* std[meta namespace]
* future[meta class]
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
#include <iostream>
#include <future>

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  p.set_value(1);

  // 共有状態を持っている
  std::cout << std::boolalpha << f.valid() << std::endl;

  f.get(); // 一度値を取り出すと共有状態が破棄される

  std::cout << std::boolalpha << f.valid() << std::endl;
}
```
* valid()[color ff0000]
* std::promise[link /reference/future/promise.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* p.set_value[link /reference/future/promise/set_value.md]
* f.get()[link get.md]

###出力
```
true
false
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


