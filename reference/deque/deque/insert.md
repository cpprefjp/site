# insert
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
iterator insert(iterator position, const T& x);                     // (1) C++03
iterator insert(const_iterator position, const T& x);               // (1) C++11

iterator insert(const_iterator position, T&& y);                    // (2) C++11

void insert(iterator position,
            size_type n, const T& x);                               // (3) C++03
iterator insert(const_iterator position,
                size_type n, const T& x);                           // (3) C++11

template <class InputIterator>
void insert(iterator position,
            InputIterator first, InputIterator last);               // (4) C++11
template <class InputIterator>
iterator insert(const_iterator position,
                InputIterator first, InputIterator last);           // (4) C++11

iterator insert(const_iterator position, initializer_list<T> init); // (5) C++11
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
任意の位置に要素を挿入する。

この関数は、`position`で指定した場所の前に新しい要素を挿入することにより、`deque`コンテナを拡張する。

これは挿入される要素の分だけコンテナのサイズを増加させ、それより前に取得された全てのイテレータを無効化する。しかし、先�または終端への挿入の場合は、参照は有効なままとなる。

二重終端�ューは、シーケンスの終端または先�への挿入（もしくは削除）が効率的なパフォーマンスとなるよう、�計されている。他の場所への挿入は通常、[`list`](/reference/list/list.md)コンテナよりも効率の面で劣る。

追加される要素の数、及びそれぞれの初期値は引数によって決定づけられる。


## 引数
- `position`新しい要素を挿入するコンテナ内の場所。`iterator`はメンバ型であり、ランダムアクセスイテレータとして定義される。
- `x`挿入される要素の初期化に使われる値。`T`はひとつめのテンプレートパラメータ（コンテナに格納される要素の型）である。
- `y`直接挿入される値。`T`はひとつめのテンプレートパラメータ（コンテナに格納される要素の型）である。
- `n`挿入する要素の数。それぞれの要素は x の値によって初期化される。メンバ型`size_type`は符号なし整数型である。
- `first, last`要素の範囲を指定する。範囲 `[first, last)` の�にある要素のコピーが位置`position`に挿入される。`first`と`last`の間の範囲は、`first`で指定された要素を含むが、`last`で指定された要素を含まない点に注意。テンプレート型はどんな入力イテレータでも構わない。


## 戻り値
- C++03まで一番上のバージョンがのみ、新しい要素が挿入された場所を指すイテレータを返す。
- C++11以降新しい要素が挿入された場所を示すイテレータ。


## 計算量
挿入する要素の数に対して線形時間（コピー・ムーブコンストラクタの呼び出し）。加えて、`position`と`deque`終端との間の要素の数に対して、ライブラリの実装依�で線形時間で増加する。


## 備考
- 条件付きで、例外が発生した場合に副作用が発生しない保証がある。
	- C++03: 要素型`T`のコピーコンストラクタ、代入演算�以外で例外が発生した場合、副作用は発生しない。
	- C++11: 要素型`T`のコピーコンストラクタ、ムーブコンストラクタ、代入演算�、ムーブ代入演算�以外で例外が発生した場合、副作用は発生しない。（ムーブについて規定が追加された。）
	- C++14: 単一要素を終端あるいは先�に追加する際に例外が発生した場合、副作用は発生しない。それ以外はC++11と同様。


## 例
```cpp example
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> c = {2, 3, 4};

  // 先�に1を挿入
  c.insert(c.begin(), 1);

  for (int x : c) {
    std::cout << x << std::endl;
  }
}
```
* insert[color ff0000]
* c.begin()[link begin.md]

### 出力
```
1
2
3
4
```

## 関連項目

| 名前 | 説明 |
|---------------------------|--------------------------------------|
| [`emplace`](emplace.md) | 任意の位置に要素を直接構築で挿入する |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (5)の経緯となる提案文書
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - 経緯の説明は、[`vector::push_back()`](/reference/vector/vector/push_back.md)ページを参照。

