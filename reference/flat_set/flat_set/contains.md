# contains
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
bool contains(const key_type& x) const;           // (1) C++23
constexpr bool contains(const key_type& x) const; // (1) C++26

template <class K>
bool contains(const K& x) const;           // (2) C++23
template <class K>
constexpr bool contains(const K& x) const; // (2) C++26
```


## 概要
指定されたキー`x`に一致する要素がコンテナに含まれているかを判定する。

- (1) : クラスのテンプレートパラメータ`key_type`型のキーを受け取る
- (2) : `key_type`と比較可能な`K`型のキーを受け取る


## テンプレートパラメータ制約
- (2) : `key_compare::is_transparent`が妥当な式であること


## 戻り値
以下と等価：

```cpp
return find(x) != end();
```
* find[link find.md]
* end()[link end.md]


## 計算量
対数時間。


## 備考
- (2) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`flat_set<string>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_set<int> fs = {3, 1, 4};

  // キー3の要素が含まれているか
  if (fs.contains(3)) {
    std::cout << "contain" << std::endl;
  }
  else {
    std::cout << "doesn't contain" << std::endl;
  }
}
```
* contains[color ff0000]

### 出力
```
contain
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
