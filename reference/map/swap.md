#swap
```cpp
void swap(map<Key,T, Compare,Allocator>& st);
```

##概要
コンテナ内のコンテンツを、同じ型の要素を保持する他の `map` オブジェクトである `st` 内のコンテンツと交換する。サイズは異なる場合もある。 
このメンバ関数の呼び出しの後、呼び出し前にコンテナ内にあった要素は `st` へ、`st` 内にあった要素は `*this` へ移る。全てのイテレータ、参照、ポインタは有効なまま残る。 


##パラメータ
- `st`  `*this`とコンテンツを交換する、同じ型の `map` コンテナ。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
    map<int, char> c1, c2;

    c1.insert(std::make_pair(10, 'a'));
    c1.insert(std::make_pair(20, 'b'));
    c1.insert(std::make_pair(30, 'c'));

    c2.insert(std::make_pair(5, 'd'));
    c2.insert(std::make_pair(15, 'e'));

    c1.swap(c2);

    map<int, char>::iterator i = c1.begin();
    for( ; i != c1.end(); ++i) {
        cout << i->first << "," << i->second << endl;
    }

    return 0;
}
```

###出力
```
5,d
15,e
```

##バージョン
###言語
- C++03

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0


