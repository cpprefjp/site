#emplace (C++11)
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
// since C++11
template <class... Args> pair<iterator, bool>
emplace(Args&&... args);
```
* pair[link ../../utility/pair.md]

##概要
コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。


##パラメータ
- `args...` : 要素のコンストラクタへ転送される引数パック。


##戻り値
要素へのイテレータと挿入されたかどうかを示す `bool` からなる [`pair`](../../utility/pair.md) を返す。  
`first` に新しく挿入された要素またはすでに `set` に格納されていた同じキー値の要素を指すイテレータが、`second` には、要素が挿入されたときに `true` が、同じキー値の要素が存在したときに `false` がセットされる。  
`iterator` はメンバ型であり、双方向イテレータとして定義される。


##計算量
コンテナサイズについて対数時間。


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

  c.emplace(42);

  std::cout << (*c.begin()).a_ << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* emplace[color ff0000]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]

###出力
```
42
```


##バージョン
###言語
- C++11


##参照

| 名前                                | 説明                             | 対応バージョン |
|-------------------------------------|----------------------------------|----------------|
| [`emplace_hint`](./emplace_hint.md) | ヒントを使って要素を直接構築する | C++11          |
| [`insert`](./insert.md)             | 要素を挿入する                   |                |
