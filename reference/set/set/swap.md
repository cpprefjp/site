#swap
```cpp
void swap(set<Key,Compare,Allocator>& st);
```

##概要
コンテナ内のコンテンツを、同じ型の要素を保持する他の `set` オブジェクトである `st` 内のコンテンツと交換する。サイズは異なる場合もある。 
このメンバ関数の呼び出しの後、呼び出し前にコンテナ内にあった要素は `st` へ、`st` 内にあった要素は `*this` へ移る。全てのイテレータ、参照、ポインタは有効なまま残る。 


##パラメータ
- `st`<br/>
`*this`とコンテンツを交換する、同じ型の `set` コンテナ。


##計算量
定数時間


##例
```cpp
#include <iostream>
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
}
```

###出力
```
5,15,
```

