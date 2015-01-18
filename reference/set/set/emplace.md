#emplace
```cpp
// since C++11
template <class... Args> pair<iterator, bool>
emplace(Args&&... args);
```

##概要
コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。


##パラメータ
- `args...` : 要素のコンストラクタへ転送される引数パック。


##戻り値
挿入されたかどうかを示す `bool` と、挿入された要素へのイテレータからなる `pair` を返す。


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

  std::cout << (*c.begin()).a_;

  return 0;
}
```

###出力
```
42
```

##参照

| | |
|---------------------------------------------------------------------------------------------------|----------------------------------------------|
| [`emplace_hint`](./emplace_hint.md) | ヒントを使って要素を直接構築する |
| [`insert`](./insert.md) | 要素を挿入する |


