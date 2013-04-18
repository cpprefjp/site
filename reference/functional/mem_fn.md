#mem_fn
```cpp
namespace std {

  template <class R, class T>
  unspecified mem_fn(R T::* pm);
  template <class R, class T, class... Args>
  unspecified mem_fn(R (T::* pm)(Args...));
  template <class R, class T, class... Args>
  unspecified mem_fn(R (T::* pm)(Args...) const);
  template <class R, class T, class... Args>
  unspecified mem_fn(R (T::* pm)(Args...) volatile);

  template <class R, class T, class... Args>
  unspecified mem_fn(R (T::* pm)(Args...) const volatile);
```
* unspecified[italic]

  template <class R, class T, class... Args>
  <i>unspecified</i> mem_fn(R (T::* pm)(Args...) &);
  template <class R, class T, class... Args>
  <i>unspecified</i> mem_fn(R (T::* pm)(Args...) const &);
  template <class R, class T, class... Args>
  <i>unspecified</i> mem_fn(R (T::* pm)(Args...) volatile &);

  template <class R, class T, class... Args>
  <i>unspecified</i> mem_fn(R (T::* pm)(Args...) const volatile &);

  template <class R, class T, class... Args>
  <i>unspecified</i> mem_fn(R (T::* pm)(Args...) &&);
  template <class R, class T, class... Args>
  <i>unspecified</i> mem_fn(R (T::* pm)(Args...) const &&);
  template <class R, class T, class... Args>
  <i>unspecified</i> mem_fn(R (T::* pm)(Args...) volatile &&);

  template <class R, class T, class... Args>
  <i>unspecified</i> mem_fn(R (T::* pm)(Args...) const volatile &&);

}




##概要

与えられたメンバ関数を呼び出す <i>[Callable](/reference/functional/callable.md)</i> オブジェクトを生成して返す。


##戻り値

`fn(t, a2, ..., aN)` の呼出しが [INVOKE](/reference/functional/invoke.md)`(pm, t, a2, ..., aN)` と等価となる [Callable](/reference/functional/callable.md) オブジェクト `fn` を返す。

`fn` の型には、必要に応じて `typedef` 名 `argument_type`, `first_argument_type`, `second_argument_type`, `result_type` が定義される。


##例外

投げない


##例

```cpp
#include <functional>
#include <memory>
#include <iostream>

int main() {
  auto l = std::make_shared<std::less<int>>();
  std::cout << std::boolalpha;
  std::cout << (*l)(3, 5) << std::endl;
  std::cout << std::mem_fn(&std::less<int>::operator ())(l, 3, 5) << std::endl;
  std::cout << std::bind(*l, std::placeholders::_1, 5)(3) << std::endl;

  // std::cout << std::bind(l, std::placeholders::_1, 5)(3) << std::endl;
  //   エラー！ std::shared_ptr< std::less<int> > は Callable ではない

  // mem_fn() で包むと Callable になる
  std::cout <<
      std::bind(std::mem_fn(&std::less<int>::operator ()), l, std::placeholders::_1, 5)(3)
  << std::endl;
}
```

###出力

```cpp
true
true
true
true
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

