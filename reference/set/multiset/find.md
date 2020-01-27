# find
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
iterator find(const key_type& x);             // (1)

template <class K>
iterator find(const K& x);                    // (2) C++14

const_iterator find(const key_type& x) const; // (3)

template <class K>
const_iterator find(const K& x) const;        // (4) C++14
```

## 概要
`x`と�価な�ーの要素を検索する。

- (1), (3) : クラスのテンプレートパラメータ`key_type`型の�ーを受け取って検索する。
- (2), (4) : `key_type`と比較可能な`K`型の�ーを受け取って検索する。


## 戻り値
- (1), (3) : `x`と�価な�ーの要素が見つかった場合は、見つかった要素へのイテレータを返す。そうでない場合は、 [`end()`](end.md) を返す。
- (2), (4) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つ�ーを`k`として、�ーが�価か判定する式`!c(k, x) && !c(x, k)`が`true`となる要素へのイテレータを返す。そのような要素がない場合は、[`end()`](end.md) を返す。


## 計算量
[`size`](size.md)`()` について対数時間。


## 備考
- (2), (4) : `key_compare::is_transparent`が妥当な式である場合のみ、この関数はオーバー�ード解決に参加する。
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバー�ードは、`multiset<string>`のようなコンテナに対し、検索操作で文�列リテラルを渡した際に、�ー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <iostream>
#include <set>
#include <string>

int main()
{
  // (1)
  {
    std::multiset<std::string> s = { "Alice", "Bob", "Carol" };
  
    decltype(s)::iterator it = s.find("Bob");
    if (it != s.end()) { // 見つかった
      std::cout << *it << std::endl;
    }
  }

  // (2)
  {
    std::multiset<std::string, std::less<>> s = { "Alice", "Bob", "Carol" };

    // std::lessのvoidに対する特殊化を使用することで、
    // 文�列リテラルをfind()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    decltype(s)::iterator it = s.find("Bob");
    if (it != s.end()) { // 見つかった
      std::cout << *it << std::endl;
    }
  }
}
```
* find[color ff0000]
* std::less[link /reference/functional/less.md]

### 出力
```
Bob
Bob
```

## 関連項目

| 名前                              | 説明                                               |
|-----------------------------------|----------------------------------------------------|
| [`count`](count.md)             | 指定した�ーにマッチする要素の数を返す             |
| [`lower_bound`](lower_bound.md) | 与えられた値より小さくない要素へのイテレータを返す |
| [`upper_bound`](upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


## 参照
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)
- [LWG Issue 2299. [CD] Effects of inaccessible `key_compare::is_transparent` type are not clear](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2299)
