#emplace_hint
```cpp
// since C++11
template <class... Args>
iterator emplace_hint(const_iterator hint, Args&&... args);
```

##概要
要素が配置されるべき場所を示唆するパラメータ `hint` を使って、コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数と同じ引数で呼ばれる。


##パラメータ
- `hint` : 新しい要素をどこへ挿入するかを示唆するために使われるイテレータ
- `args...` : 要素のコンストラクタへ転送される引数パック


##戻り値
挿入が行われたかどうかを示す `bool` と、挿入された要素へのイテレータからなる `pair` を返す。


##計算量
一般にコンテナのサイズについて対数時間だが、新しい要素が `hint` の前に挿入された場合は償却定数時間。


##例
```cpp
#include <iostream>
#include <set>
using namespace std;
 
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
  set<s> c;
 
  c.insert(s(10));
  c.insert(s(20));
  c.insert(s(30));
 
  c.emplace_hint(c.find(s(20)), 15);
  cout << c.size() << endl;
  
  return 0;
}
```

###出力
```
4
```

##参照

| | |
|-----------------------------------------------------------------------------------------|-----------------------------|
| [`emplace`](./emplace.md) | 要素を直接構築する |
| [`insert`](./insert.md) | 要素を挿入する |


