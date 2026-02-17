# operator[]
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
mapped_type&
  operator[](const key_type& x); // (1) C++23
constexpr mapped_type&
  operator[](const key_type& x); // (1) C++26

mapped_type&
  operator[](key_type&& x); // (2) C++23
constexpr mapped_type&
  operator[](key_type&& x); // (2) C++26

template <class K>
mapped_type&
  operator[](K&& x); // (3) C++23
template <class K>
constexpr mapped_type&
  operator[](K&& x); // (3) C++26
```

## 概要
指定したキーを持つ要素を取得する。対応する要素が存在しない場合は生成して返す。

- (1) : 左辺値のキーを受け取る
- (2) : 一時オブジェクトのキーを受け取る
- (3) : `key_type`と比較可能なキーを受け取る


## テンプレートパラメータ制約
- (3) : `key_compare::is_transparent`が妥当な式であること


## 戻り値
- (1) : 以下と等価
    ```cpp
    return try_emplace(x).first->second;
    ```
    * try_emplace[link try_emplace.md]

- (2) : 以下と等価
    ```cpp
    return try_emplace(std::move(x)).first->second;
    ```
    * try_emplace[link try_emplace.md]
    * std::move[link /reference/utility/move.md]

- (3) : 以下と等価
    ```cpp
    return try_emplace(std::forward(x)).first->second;
    ```
    * try_emplace[link try_emplace.md]


## 計算量
要素数に対して対数時間


## 備考
- (3) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`flat_map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<int, char> fm;
  fm.insert(std::make_pair(1, 'a'));

  // キー`1`に対応する要素を参照する
  char& a = fm[1];
  std::cout << a << std::endl;

  // キー`2`に対応する要素を生成する
  fm[2] = 'b';
}
```
* fm[1][color ff0000]
* fm[2][color ff0000]
* fm.insert[link insert.md]

### 出力
```
a
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`at()`](at.md)


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
