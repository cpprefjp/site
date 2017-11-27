# assign
* functional[meta header]
* std[meta namespace]
* function[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* cpp17removed[meta cpp]

```cpp
template <class F, class Alloc>
void assign(F&& f, const Alloc& alloc);
```

この機能は、C++17で削除された。このクラスでメモリアロケータを使用する必要はない。


## 概要
関数オブジェクトとアロケータを再代入する。


## 効果
```cpp
function(allocator_arg, alloc, std::forward<F>(f)).swap(*this)
```
* function[link op_constructor.md]
* allocator_arg[link /reference/memory/allocator_arg_t.md]
* std::forward[link /reference/utility/forward.md]
* swap[link swap.md]


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x) { return x; }

int main()
{
  std::function<int(int)> f;

  // 関数とアロケータを代入。
  //
  // ※ここではint型を対象とするアロケータを渡しているが、
  // 内部で適切な関数の型にrebindして使われる。
  f.assign(ident, std::allocator<int>());

  int result = f(1);
  std::cout << result << std::endl;
}
```
* assign[color ff0000]
* std::allocator[link /reference/memory/allocator.md]
* f(1)[link op_call.md]

### 出力
```
1
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): (4.8.2時点で実装していない)
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N2308 Adding allocator support to `std::function` for C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2308.html)
- [P0302R1 Removing Allocator Support in `std::function` (rev 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0302r1.html)
- [LWG Issue 2385. `function::assign` allocator argument doesn't make sense](https://wg21.cmeerw.net/lwg/issue2385)
