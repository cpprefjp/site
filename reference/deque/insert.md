#insert
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
// C++03まで
iterator insert(iterator position, const T& x);
void insert(iterator position, size_type n, const T& x);
template <class InputIterator>
void insert(iterator position, InputIterator first, InputIterator last);

// C++11以降
iterator insert(const_iterator position, const T& x);
iterator insert(const_iterator position, T&& y);
iterator insert(const_iterator position, size_type n, const T& x);
template <class InputIterator>
iterator insert(const_iterator position, InputIterator first, InputIterator last);
iterator insert(const_iterator position, initializer_list<T> init);
```
* initializer_list[link /reference/initializer_list.md]

##概要
任意の位置に要素を挿入する。

この関数は、`position`で指定した場所の前に新しい要素を挿入することにより、`deque`コンテナを拡張する。
これは挿入される要素の分だけコンテナのサイズを増加させ、それ以前に取得された全てのイテレータを無効化する。しかし、先頭または終端への挿入の場合は、参照は有効なままとなる。
二重終端キューは、シーケンスの終端または先頭への挿入（もしくは削除）が効率的なパフォーマンスとなるよう、設計されている。他の場所への挿入は通常、[`list`](/reference/list.md)コンテナよりも効率の面で劣る。
追加される要素の数、及びそれぞれの初期値は引数によって決定づけられる。


##引数
- `position`新しい要素を挿入するコンテナ内の場所。`iterator`はメンバ型であり、ランダムアクセスイテレータとして定義される。
- `x`挿入される要素の初期化に使われる値。`T`はひとつめのテンプレートパラメータ（コンテナに格納される要素の型）である。
- `y`直接挿入される値。`T`はひとつめのテンプレートパラメータ（コンテナに格納される要素の型）である。
- `n`挿入する要素の数。それぞれの要素は x の値によって初期化される。メンバ型`size_type`は符号なし整数型である。
- `first, last`要素の範囲を指定する。範囲 `[first, last)` の中にある要素のコピーが位置`position`に挿入される。`first`と`last`の間の範囲は、`first`で指定された要素を含むが、`last`で指定された要素を含まない点に注意。テンプレート型はどんな入力イテレータでも構わない。


##戻り値
- C++03まで一番上のバージョンがのみ、新しい要素が挿入された場所を指すイテレータを返す。
- C++11以降新しい要素が挿入された場所を示すイテレータ。


##計算量
挿入する要素の数に対して線形時間（コンストラクタ）。加えて、`position`と`deque`終端との間の要素の数に対して、ライブラリの実装依存で線形時間で増加する。


##例
```cpp
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> c = {2, 3, 4};

  // 先頭に1を挿入
  c.insert(c.begin(), 1);

  for (int x : c) {
    std::cout << x << std::endl;
  }
}
```
* insert[color ff0000]

###出力
```
1
2
3
4
```

##参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)


##関連項目

| | |
|---------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| [`emplace`](./emplace.md) | 任意の位置に要素を直接構築で挿入する |


