# insert
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
iterator insert(iterator position, const T& x);                   // (1) C++03
iterator insert(const_iterator position, const T& x);             // (1) C++11

iterator insert(const_iterator position, T&& x);                  // (2) C++11

void insert(iterator position,
            size_type n, const T& x);                             // (3) C++03
iterator insert(const_iterator position,
                size_type n, const T& x);                         // (3) C++11

template <class InputIterator>
void insert(iterator position,
            InputIterator first, InputIterator last);             // (4) C++03
template <class InputIterator>
iterator insert(const_iterator position,
                InputIterator first, InputIterator last);         // (4) C++11

iterator insert(const_iterator position, initializer_list<T> il); // (5) C++11
```

## 概要
任意の位置に新たな要素を挿入する


## テンプレートパラメータ制約
- (1)
    - 型`T`が`*this`のコンテナに対してコピー挿入可能であること
    - 型`T`が[コピー代入可能](/reference/type_traits/is_copy_assignable.md)であること
- (2)
    - 型`T`が`*this`のコンテナに対してムーブ挿入可能であること
    - 型`T`が[ムーブ代入可能](/reference/type_traits/is_move_assignable.md)であること
- (3)
    - 型`T`が`*this`のコンテナに対してコピー挿入可能であること
    - 型`T`が[コピー代入可能](/reference/type_traits/is_copy_assignable.md)であること


## 戻り値
挿入された要素を指すイテレータ


## 計算量
挿入される要素の数と挿入される要素の位置と[`end()`](end.md)の間の要素数に対して線形時間の計算量が必要である。


## 備考
- 要素を追加した後の[`size()`](size.md)が要素を追加する前の[`capacity()`](capacity.md)よりも大きい場合は領域の再確保が生じる。領域の再確保が生じなかった場合には挿入位置より前のイテレーターや参照は有効である。
- 条件付きで、例外が発生した場合に副作用が発生しない保証がある。
	- C++03: 要素型`T`のコピーコンストラクタ、代入演算�以外で例外が発生した場合、副作用は発生しない。
	- C++11: 要素型`T`のコピーコンストラクタ、ムーブコンストラクタ、代入演算�、ムーブ代入演算�、またはInputIteratorの操作以外で例外が発生した場合、副作用は発生しない。（ムーブとInputIteratorの操作について規定が追加された。）
	- C++14: 単一要素を終端に追加する場合は[`push_back()`](push_back.md)と同様。それ以外はC++11と同様。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

int main()
{
  std::vector<std::string> v = {"aaa", "bbb", "ccc"};

  // 挿入位置と、追加するconst&の要素を指定するバージョン
  {
    std::string s = "ddd";
    v.insert(v.begin() + 1, s);
  }

  // 挿入位置と、追加する&&の要素を指定するバージョン
  {
    v.insert(v.begin() + 1, std::string("eee"));
  }

  // 挿入位置とイテレータの範囲を指定するバージョン
  {
    std::vector<std::string> x = {"fff", "ggg"};
    v.insert(v.begin() + 1, x.begin(), x.end());
  }

  // 挿入位置と初期化�リストを指定するバージョン
  {
    v.insert(v.begin() + 1, {"hhh", "iii"});
  }

  std::for_each(v.begin(), v.end(), [](decltype(v)::const_reference x) {
    std::cout << x << std::endl;
  });
}
```
* insert[color ff0000]

### 出力
```
aaa
hhh
iii
fff
ggg
eee
ddd
bbb
ccc
```

## バージョン
### 言語
- C++11 :右辺参照バージョン
	- [Clang](/implementation.md#clang): ??
	- [GCC](/implementation.md#gcc): 
	- [GCC](/implementation.md#gcc): 4.7.0
	- [ICC](/implementation.md#icc): ??
	- [Visual C++](/implementation.md#visual_cpp): 2010

- C++11 : 初期化�リストバージョン
	- [Clang](/implementation.md#clang): ??
	- [GCC](/implementation.md#gcc): 
	- [GCC](/implementation.md#gcc): 4.7.0
	- [ICC](/implementation.md#icc): ??
	- [Visual C++](/implementation.md#visual_cpp) 

## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (5)の経緯となる提案文書
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - 経緯の説明は、[`vector::push_back()`](/reference/vector/vector/push_back.md)ページを参照。

