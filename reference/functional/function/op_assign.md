#代入演算子 (C++11)
```cpp
function& operator=(const function& f);               // (1)
function& operator=(function&& f);                    // (2)
function& operator=(nullptr_t);                       // (3)

template<class F>
function& operator=(F&& f);                           // (4)

template<class F>
function& operator=(reference_wrapper<F> f) noexcept; // (5)
```

##効果
- (1) : [`function`](./function.md)`(f).`[`swap`](./swap.md)`(*this)`
- (2) : `*this`が持つ関数を、`f`のそれで置き換える。
- (3) : `*this`が有効な関数ポインタ、メンバポインタ、もしくは関数オブジェクトを持っている場合、それを解放する。
- (4) : [`function`](./function.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f)).`[`swap`](./swap.md)`(*this)`
- (5) : [`function`](./function.md)`(f).`[`swap`](./swap.md)`(*this)`


##戻り値
`*this`


##例外
- (5) : 投げない


##例
```cpp
#include <iostream>
#include <functional>

int ident(int x) { return x; }

int main()
{
  std::function<int(int)> f;

  // 関数を代入
  f = ident;

  int result = f(1);
  std::cout << result << std::endl;
}
```

###出力
```
1
```


##バージョン
###言語
- C++11


###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): 4.3.6
- [Visual C++](/implementation#visual_cpp.md): ??


##参照

