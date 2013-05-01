#emplace_hint
```cpp
// since C++11
template <class<span style='color:rgb(0,0,0)'>... Args> iterator emplace_hint(const_iterator hint, Args&&... args);
</span>
```

##概要

　要素が配置されるべき場所を示唆する引数 hint を使って、コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数と同じ引数で呼ばれる。


##引数
　・hint
　　新しい要素をどこへ挿入するかを示唆するために使われるイテレータ

　・args

　　要素のコンストラクタへフォワードされる引数


##戻り値

　挿入が行われたかどうかを示す bool と、挿入された要素へのイテレータからなる pair を返す。


##計算量

　一般にコンテナのサイズについて対数時間だが、新しい要素が <i>hint</i> の前に挿入された場合は<color=ff0000><del></color>ならされた定数時間<color=ff0000></del></color>amortized constant。


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;background-color:rgb(240,240,240)'>#include <iostream>
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
}</pre>
```

###出力

```cpp
4
```

##参照

| | |
|-----------------------------------------------------------------------------------------|-----------------------------|
|[ set::emplace](/reference/set/emplace.md) | 要素を直接構築する |
| [set::insert](/reference/set/insert.md) | 要素を挿入する |


