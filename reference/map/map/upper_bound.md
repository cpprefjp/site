#upper_bound
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
iterator upper_bound(const key_type& x);             // (1)

template <class K>
iterator upper_bound(const K& x);                    // (2) C++14

const_iterator upper_bound(const key_type& x) const; // (3)

template <class K>
const_iterator upper_bound(const K& x) const;        // (4) C++14
```

##概要
`x` より大きいキーを持つコンテナ内の最初の要素を指すイテレータを返す（コンテナの比較オブジェクトを使う）。

[`lower_bound()`](/reference/map/map/lower_bound.md) と異なり、このメンバ関数は `x` と等しいときは要素へのイテレータを返さず、それは大きい場合にのみ要素へのイテレータを返す。

内部的に、`map` コンテナ内の全ての要素は常に比較オブジェクトで定義された基準に従って並ぶため、この関数が返す値に続く全ての要素は `x` より大きいことに注意。

- (1), (3) : `key_type`型のキーを受け取り、そのキーより大きい最初の要素へのイテレータを取得する。
- (2), (4) : `key_type`と比較可能な`K`型のキーを受け取り、そのキーより大きい最初の要素へのイテレータを取得する。


##戻り値
- (1), (3) : キー`x`より大きい最初の要素へのイテレータを返す。そのような要素がない場合は、[`end()`](./end.md)を返す。
- (2), (4) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つキーを`k`として、キーが小さくないか判定する式`c(x, k)`が`true`となる要素へのイテレータを返す。そのような要素がない場合は、[`end()`](./end.md) を返す。


##計算量
[`size()`](/reference/map/map/size.md) について対数時間。


##備考
- (2), (4) : この関数がオーバーロード解決に参加する条件は、[`find()`](./find.md)メンバ関数の備考欄を参照。


##例
```cpp
#include <iostream>
#include <string>
#include <map>

int main()
{
  // (1)
  {
    std::map<std::string, int> m = {
      {"A", 3},
      {"B", 1},
      {"C", 4},
      {"D", 5}
    };

    // B以上D以下の範囲を取得
    decltype(m)::iterator it = m.lower_bound("B");
    decltype(m)::iterator last = m.upper_bound("D");
      
    while (it != last) {
      std::cout << it->first << ',' << it->second << std::endl;
      ++it;
    }
    std::cout << std::endl;
  }
    
  // (2)
  {
    std::map<std::string, int, std::less<>> m = {
      {"A", 3},
      {"B", 1},
      {"C", 4},
      {"D", 5}
    };

    // std::lessのvoidに対する特殊化を使用することで、
    // 文字列リテラルをlower_bound()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    decltype(m)::iterator it = m.lower_bound("B");
    decltype(m)::iterator last = m.upper_bound("D");

    while (it != last) {
      std::cout << it->first << "," << it->second << std::endl;
      ++it;
    }
  }
}
```
* upper_bound[color ff0000]
* lower_bound[link ./lower_bound.md]
* std::string[link /reference/string/basic_string.md]
* std::less[link /reference/functional/less.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
B,1
C,4
D,5

B,1
C,4
D,5
```

##関連項目

| | |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| [`lower_bound`](/reference/map/map/lower_bound.md) | 与えられた値よりも小さくない最初の要素へのイテレータを返す |
| [`equal_range`](/reference/map/map/equal_range.md) | 指定したキーにマッチする要素範囲を返す |
| [`find`](/reference/map/map/find.md) | 指定したキーで要素を探す |
| [`count`](/reference/map/map/count.md) | 指定したキーにマッチする要素の数を返す |


##参照
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)

