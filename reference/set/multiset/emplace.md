# emplace
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
pair<iterator, bool>
  emplace(Args&&... args); // (1) C++11
template <class... Args>
constexpr pair<iterator, bool>
  emplace(Args&&... args); // (1) C++26
```

## 概要
コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。


## パラメータ
- `args...` : 要素のコンストラクタへ転送される引数パック。


## 戻り値
挿入された要素を指すイテレータを返す。
`iterator` はメンバ型であり、双方向イテレータとして定義される。


## 計算量
コンテナサイズについて対数時間。


## 備考
この関数が呼ばれた後も、当該コンテナ内の要素を指す参照やイテレータは無効にはならない。  
なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。


## 例
```cpp example
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
  std::multiset<s> c;

  c.emplace(42);

  std::cout << (*c.begin()).a_ << std::endl;
}
```
* emplace[color ff0000]
* c.begin()[link begin.md]

### 出力
```
42
```


## バージョン
### 言語
- C++11


## 関連項目

| 名前                                | 説明                             | 対応バージョン |
|-------------------------------------|----------------------------------|----------------|
| [`emplace_hint`](emplace_hint.md) | ヒントを使って要素を直接構築する | C++11          |
| [`insert`](insert.md)             | 要素を挿入する                   |                |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
