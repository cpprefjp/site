#empty
```cpp
bool empty() const noexcept;
```

##概要
コンテナが空かどうかをテストする。 
`map` コンテナが空（[`size()`](./size.md) が 0）の場合に `true` を返す。 

この関数はコンテナ内のコンテンツを変化させない。コンテンツをクリアするには [`clear()`](./clear.md) メンバを使う。


##戻り値
コンテナサイズが 0 のときに `true`, そうでないときに `false`。


##計算量
定数時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main ()
{
    map<int, char> c;

    cout << c.empty() << endl;

    c.insert(std::make_pair(42,'a'));

    cout << c.empty() << endl;

    return 0;
}
```

###出力
```
1
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0

##参照

| 名前 | 説明|
|---------------------------------------------------------------------------------------|-----------------------|
| [`insert`](./insert.md) | 要素を挿入する |
| [`(constructor)`](./map.md) | コンストラクタ |


