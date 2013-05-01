#swap
```cpp
void swap(set<Key,Compare,Allocator>& st);
```

##概要

　コンテナ内のコンテンツを、同じ型の要素を保持する他の set オブジェクトである <i>st</i> 内のコンテンツと交換する。サイズは異なる場合もある。

　このメンバ関数の呼び出しの後、呼び出し前にコンテナ内にあった要素は <i>st</i> へ、<i>st</i> 内にあった要素は this へ移る。全てのイテレータ、参照、ポインタは有効なまま残る。

　グローバルなアルゴリズム関数 swap は同じ名前であり、同じ振舞いをする。


##引数

　・st

　　このコンテナとコンテンツを交換する、同じ型の set コンテナ。


##計算量

　定数時間


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
#include <set>
using namespace std;
 
int main()
{
  set<int> c1, c2;
 
  c1.insert(10);
  c1.insert(20);
  c1.insert(30);
 
  c2.insert(5);
  c2.insert(15);
 
  c1.swap(c2);
 
  set<int>::iterator i = c1.begin();
  while(i != c1.end()) {
    cout << *(i++) << ",";
  }
  
  return 0;
}</pre>
```

###出力

```cpp
5,15,
```

##
