# to_address
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Ptr>
  constexpr auto to_address(const Ptr& p) noexcept; // (1)

  template <class T>
  constexpr T* to_address(T* p) noexcept;           // (2)
}
```

## 概要
ポインタと見なせるオブジェクトからアドレスを取得する。


## 要件
- (2) : 型`T`が関数ではないこと


## 戻り値
- (1) : 式[`pointer_traits`](pointer_traits.md)`<Ptr>::to_address(p)`が有効であればその戻り値を返す。そうでなければ、`to_address(p.operator->())`を返す
- (2) : `p`を返す


## 例外
投げない


## 例

### ポインタの例

```cpp example
#include <iostream>
#include <memory>

int main()
{
  int x = 3;
  int* p = &x;

  // ポインタからアドレスを取得する。
  // なにもせず、渡したものが返る
  int* result1 = std::to_address(p);
  std::cout << *result1 << std::endl;

  // スマートポインタからアドレスを取得する。
  // スマートポインタが所有権管理しているポインタが返る
  std::shared_ptr<int> sp {new int(1)};
  int* result2 = std::to_address(sp);
  std::cout << *result2 << std::endl;
}
```
* std::to_address[color ff0000]

#### 出力
```
3
1
```

### イテレータの例

```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> vec = {1, 2, 3, 4};

  // vectorやstring等のイテレータはcontiguousではあるが、実装によってポインタではない場合がある
  auto it = vec.begin();
  auto end = vec.end();

  // contiguousなイテレータをその要素へのポインタに変換する
  int* p = std::to_address(it);

  // 特に、終端イテレータからポインタへの変換で未定義動作を回避できる
  int* ep = std::to_address(end);
  // この様にしてしまうと、オブジェクトを指していないポインタのデリファレンスとなり未定義動作
  //int* ep = &*end;

  std::cout << *p << '\n';
  std::cout << *(ep - 1);
}
```
* std::to_address[color ff0000]

#### 出力
```
1
4
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 6.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0653R2 Utility to convert a pointer to a raw pointer](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0653r2.html)
- [`pointer_traits` - Boost Core Library](http://www.boost.org/doc/libs/1_66_0/libs/core/doc/html/core/pointer_traits.html)
- [LWG Issue 3374. P0653 + P1006 should have made the other `std::to_address` overload `constexpr`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3374)
