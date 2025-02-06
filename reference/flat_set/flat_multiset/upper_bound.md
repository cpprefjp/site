# upper_bound
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
iterator upper_bound(const key_type& x);             // (1) C++23

template <class K>
iterator upper_bound(const K& x);                    // (2) C++23

const_iterator upper_bound(const key_type& x) const; // (3) C++23

template <class K>
const_iterator upper_bound(const K& x) const;        // (4) C++23
```

## 概要
`x` より大きいキーを持つコンテナ内の最初の要素を指すイテレータを返す（コンテナの比較オブジェクトを使う）。

[`lower_bound()`](lower_bound.md) と異なり、このメンバ関数は `x` と等しいときは要素へのイテレータを返さず、それは大きい場合にのみ要素へのイテレータを返す。

内部的に、`flat_multiset` コンテナ内の全ての要素は常に比較オブジェクトで定義された基準に従って並ぶため、この関数が返す値に続く全ての要素は `x` より大きいことに注意。

- (1) : `key_type`型のキーを受け取り、そのキーより大きい最初の要素へのイテレータを取得する。
- (2) : `key_type`と比較可能な`K`型のキーを受け取り、そのキーより大きい最初の要素へのイテレータを取得する。
- (3) : `const`な`*this`オブジェクトにおいて、`key_type`型のキーを受け取り、そのキーより大きい最初の要素へのイテレータを取得する。
- (4) : `const`な`*this`オブジェクトにおいて、`key_type`と比較可能な`K`型のキーを受け取り、そのキーより大きい最初の要素へのイテレータを取得する。


## 戻り値
- (1), (3) : キー`x`より大きい最初の要素へのイテレータを返す。そのような要素がない場合は、[`end()`](end.md)を返す。
- (2), (4) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つキーを`k`として、キーが小さくないか判定する式`c(x, k)`が`true`となる要素へのイテレータを返す。そのような要素がない場合は、[`end()`](end.md) を返す。


## 計算量
[`size()`](size.md) について対数時間。


## 備考
- (2), (4) : この関数がオーバーロード解決に参加する条件は、[`find()`](find.md)メンバ関数の備考欄を参照。


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <string>

int main()
{
  // (1)
  {
    std::flat_multiset<std::string> fs = {
      "Alice", "Bob", "Carol", "David"
    };

    // Bob以上David以下の範囲を取得
    decltype(fs)::iterator it = fs.lower_bound("Bob");
    decltype(fs)::iterator last = fs.upper_bound("David");

    while (it != last) {
      std::cout << *it << std::endl;
      ++it;
    }
  }

  std::cout << std::endl;

  // (2)
  {
    std::flat_multiset<std::string, std::less<>> fs = {
      "Alice", "Bob", "Carol", "David"
    };

    // std::lessのvoidに対する特殊化を使用することで、
    // 文字列リテラルをlower_bound()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    decltype(fs)::iterator it = fs.lower_bound("Bob");
    decltype(fs)::iterator last = fs.upper_bound("David");

    while (it != last) {
      std::cout << *it << std::endl;
      ++it;
    }
  }
}
```
* upper_bound[color ff0000]
* fs.lower_bound[link lower_bound.md]
* std::less[link /reference/functional/less.md]

### 出力
```
Bob
Carol
David

Bob
Carol
David
```


## バージョン
### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|------------------------------------------------|----------------------------------------------------------|
| [`flat_multiset::lower_bound`](lower_bound.md) | 指定した値よりも小さくない最初の要素へのイテレータを返す |
| [`flat_multiset::equal_range`](equal_range.md) | 指定したキーにマッチする要素範囲を返す                   |
| [`flat_multiset::find`](find.md)               | 指定したキーで要素を探す                                 |
| [`flat_multiset::count`](count.md)             | 指定したキーにマッチする要素の数を返す                   |
