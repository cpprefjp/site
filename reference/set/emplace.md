#emplace
```cpp
// since C++11
template <class... Args> pair<iterator, bool> emplace(Args&&... args);
```

##概要

　コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。


##引数

　・args
　　要素のコンストラクタへフォワードされる引数。


##戻り値

　挿入されたかどうかを示す bool と、挿入された要素へのイテレータからなる pair を返す。


##計算量

　コンテナサイズについて対数時間。


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
#include <set>
using namespace std;
 
struct s
{
  s(int a): a_(a) {}
  int a_;
};</pre><pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;background-color:rgb(240,240,240)'>bool operator<(const s& lhs, const s& rhs)</pre><pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;background-color:rgb(240,240,240)'>{</pre><pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;background-color:rgb(240,240,240)'>  return lhs.a_ < rhs.a_;</pre><pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;background-color:rgb(240,240,240)'>}</pre><pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;background-color:rgb(240,240,240)'> 
int main()
{
  set<s> c;
 
  c.emplace(42);
 
  cout << (*c.begin()).a_;
  
  return 0;
}</pre>
```

###出力

```cpp
42
```

##参照


| | |
|---------------------------------------------------------------------------------------------------|----------------------------------------------|
| [set::emplace_hint](/reference/set/emplace_hint.md) | hint を使って要素を直接構築する |
| [set::insert](/reference/set/insert.md) | 要素を挿入する |


