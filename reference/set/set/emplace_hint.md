#emplace_hint
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
iterator emplace_hint(const_iterator hint, Args&&... args);
```

##概要
要素が配置されるべき場所を示唆するパラメータ `hint` を使って、コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数と同じ引数で呼ばれる。


##パラメータ
- `hint` : 新しい要素をどこへ挿入するかを示唆するために使われるイテレータ
- `args...` : 要素のコンストラクタへ転送される引数パック


##戻り値
新しく挿入された要素またはすでに `set` に格納されていた同じキー値の要素を指すイテレータを返す。
`iterator` はメンバ型であり、双方向イテレータとして定義される。


##計算量
一般にコンテナのサイズについて対数時間だが、新しい要素が `hint` の前に挿入された場合は償却定数時間。


##例
```cpp
#include <iostream>
#include <set>

struct s
{
  s(int a): a_(a) {}
  int a_;
};

bool operator<(const s& lhs, const s& rhs)
{
  return lhs.a_ < rhs.a_;
}

int main()
{
  std::set<s> c;

  c.insert(s(10));
  c.insert(s(20));
  c.insert(s(30));

  c.emplace_hint(c.find(s(20)), 15);
  std::cout << c.size() << std::endl;
}
```
* emplace_hint[color ff0000]
* c.insert[link insert.md]
* c.find[link find.md]
* c.size()[link size.md]

###出力
```
4
```


##バージョン
###言語
- C++11


##関連項目

| 名前                      | 説明               | 対応バージョン |
|---------------------------|--------------------|----------------|
| [`emplace`](emplace.md) | 要素を直接構築する | C++11          |
| [`insert`](insert.md)   | 要素を挿入する     |                |


##参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)

