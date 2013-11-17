#erase
```cpp
// until C++11
void erase(iterator position);

// since C++11
iterator erase(const_iterator position);

// until C++11
void erase(const_iterator first, const_iterator last);

// since C++11
iterator erase(const_iterator first, const_iterator last);

size_type erase(const key_type& x);
```


##概要
単一要素または要素範囲（`[first, last)`）を `multimap` コンテナから削除する。 
これは削除された要素の数だけコンテナの `size` を減らし、それぞれの要素のデストラクタを呼び出す。


##パラメータ
- `position` : `multimap` から削除する単一要素を指すイテレータ。`iterator` はメンバ型であり、双方向イテレータとして定義される。
- `x` : `multimap` から削除される値のキー。`key_type` はメンバ型であり、`multimap` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータであり、コンテナに格納される要素のキーの型である。
- `first, last` : `multimap` コンテナ内の、削除される範囲 `[first, last)` を指定するイテレータ。ここでいう範囲は `first` と `last` の間の全ての要素を含み、`first` が指す要素を含むが `last` が指す要素は含まない。


##戻り値
`iterator` を返すタイプのバージョンは、削除された要素の次を指すイテレータを返す。 
`size_type` を返すタイプのバージョンは、削除された要素の数を返す。　


##計算量
引数に `position` をとるバージョンは定数時間。 
引数に `first` 、`last` をとるバージョンはコンテナの [`size()`](/reference/map/multimap/size.md) についての対数時間、プラス `first` と `last` の間の距離に対する線形時間。 
引数に `x` をとるバージョンはコンテナの [`size()`](/reference/map/multimap/size.md) について対数時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  multimap<int, char> c;

  c.insert(std::make_pair(1,'A'));
  c.insert(std::make_pair(2,'B'));
  c.insert(std::make_pair(3,'C'));
  cout << c.size() << endl;

  c.erase(1);
  cout << c.size() << endl;

  c.erase(5);
  cout << c.size() << endl;

  c.erase(c.begin(), c.end());
  cout << c.size() << endl;

  return 0;
}
```

###出力
```
3
2
2
0
```
##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0

##参照

| 名前 | 説明|
|---------------------------------------------------------------------------------------|--------------------------------------|
| [`multimap::clear`](/reference/map/multimap/clear.md) | 全ての要素を削除する |
| [`multimap::insert`](/reference/map/multimap/insert.md) | 要素を挿入する |
| [`multimap::find`](/reference/map/multimap/find.md) | 指定したキーで要素を探す |



