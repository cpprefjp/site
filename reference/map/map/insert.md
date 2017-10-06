# insert
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
pair<iterator, bool> insert(const value_type& x);              // (1)

template <class P>
pair<iterator, bool> insert(P&& x);                            // (2) C++11から

iterator insert(iterator position, const value_type& x);       // (3) C++11まで
iterator insert(const_iterator position, const value_type& x); // (3) C++11から

template <class P>
iterator insert(const_iterator position, P&& x);               // (4) C++11から

template <class InputIterator>
void insert(InputIterator first, InputIterator last);          // (5)

void insert(initializer_list<value_type> init);                // (6) C++11から
```
* pair[link /reference/utility/pair.md]
* initializer_list[link /reference/initializer_list.md]

## 概要
新しく一つの要素(引数 `x`, `y`を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入することにより、 `map` コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](/reference/map/map/size.md) を増やす。

 `map` コンテナは重複したキーを持つ要素を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じキーかどうかをチェックする。もし同じであれば要素は挿入されず、戻り値を持つ関数の場合はそれへのイテレータを返す。

重複した値を許す、類似したコンテナについては `multimap` を参照。

内部的に `map` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。

この操作は、適切な引数 `position` を提供することで効率を飛躍的に改善することができる。


## 要件
- (1) : `value_type` は、コンテナに対してコピー挿入可能でなければならない。
- (2) : `value_type` は、コンテナに対してムーブ挿入可能でなければならない。
- (3) : `value_type` は、コンテナに対してコピー挿入可能でなければならない。
- (4) : `value_type` は、コンテナに対してムーブ挿入可能でなければならない。
- (5) : 範囲`[first, last)`の各イテレータが、`*this`の要素を指さないこと。


## 効果
- (1) : `x`を`*this`の要素としてコピー挿入する。ただし、`x`のキーと同等のキーを持つ要素が`*this`に存在する場合には、挿入されない。
- (2) : [`emplace`](emplace.md)`(`[`std::forward`](/reference/utility/forward.md)`<P>(x))`と同等。
- (3) : `x`を`*this`の要素としてコピー挿入する。ただし、`x`のキーと同等のキーを持つ要素が`*this`に存在する場合には、挿入されない。可能であれば、挿入位置のヒントを表すイテレータ`position`のすぐ前に挿入する。
- (4) : [`emplace_hint`](emplace_hint.md)`(position,` [`std::forward`](/reference/utility/forward.md)`<P>(x))`と同等。
- (5) : 範囲`[first, last)`の各要素を`*this`の要素として挿入する。ただし、`*this`にすでに存在するキーと同等なキーを持つ要素については、挿入されない。
- (6) : `insert(init.begin(), init.end())`と同等。


## 戻り値
- (1), (2) : 戻り値としては、イテレータと`bool`値の組を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、 `second` に `true` が設定される。
    - 挿入されなかった場合には、 `first` に `x` と同等のキーを持つ要素へのイテレータ、 `second` に `false` が設定される。
- (3), (4) :
    - 挿入された場合には、新しく挿入された要素を指すイテレータを返す。
    - 挿入されなかった場合には、`x`のキーと同等のキーを持つ要素へのイテレータを返す。


## 計算量
- (1), (2) : 対数時間
- (3), (4) : 一般に対数時間だが、指定された新たな要素が `position` が指す要素の前に挿入された場合は償却定数時間。（ただし、備考も参照）
- (5), (6) : 般に N log(size + N)。（ただし、備考も参照）
    - ここで、 `N` は `first` と `last` の間の距離であり `size` は挿入前のコンテナの [`size()`](/reference/map/map/size.md) を表す。


## 備考
- (3), (4) : C++03 までの仕様では、計算量が償却定数時間となる条件は、「`position` が指す要素の**後ろ**に挿入された場合」となっているが、主要な実装はC++03時点から `position` が指す**前**に挿入する場合に償却定数時間となっていた。これは、`position` の後ろでは、適切な位置が先頭の場合に指定する方法がないこと、`vector::insert` の場合、`position` の前に挿入されること、STL のオリジナルである HP 社の実装が `position` の前に挿入する場合に償却定数時間であったことなどによる。

- (5) : C++03 までの仕様では、`first` と `last` の間が昇順にソートされていた場合、計算量が線形時間となっていたが、この仕様は実現性がないため C++11 では削除された。（例えば、コンテナの既存の要素が 2 から 100 の偶数のみの場合に、1 から 99 のソートされた奇数の範囲を挿入する場合を考えてみよ）

- (2), (4) : [`std::is_constructible`](/reference/type_traits/is_constructible.md)`<value_type, P&&>::value == true`である場合のみ、これらの関数はオーバーロード解決に参加する。


## 例
```cpp
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> m1;
  std::map<char,int> m2;

  m1.insert(std::make_pair('a', 10));
  m1.insert(std::make_pair('b', 20));
  m1.insert(std::make_pair('c', 30));

  std::cout << m1.size() << std::endl;

  m2.insert(m1.begin(), m1.end());
  m2.insert(std::make_pair('d', 40));

  std::cout << m2.size() << std::endl;

  return 0;
}
```
* insert[color ff0000]
* size()[link size.md]
* m1.begin()[link begin.md]
* m1.end()[link end.md]

### 出力
```
3
4
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


## 関連項目

| 名前 | 説明 |
|-------------------------------------------------------------------------------------|--------------------------------------|
| [`map::erase`](/reference/map/map/erase.md) | 要素を削除する |
| [`map::find`](/reference/map/map/find.md) | 指定したキーで要素を探す |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (6)の経緯となる提案文書
- [LWG Issue 2005. `unordered_map::insert(T&&)` protection should apply to `map` too](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2005)
    - C++14から、(2)と(4)の仕様の書き方が、`unordered_map::insert()`のものと統一された。

