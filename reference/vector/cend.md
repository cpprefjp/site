#cend
```cpp
const_iterator end() const noexcept;
```

##概要

<b>末尾要素の次を指す読み取り専用イテレータを取得する。</b>
<b></b>
<b>[end](/reference/vector/end.md)()は非constなvectorオブジェクトに対してiteratorを返し、constなvectorオブジェクトに対してはconst_iteratorを返すが、cend()はconst_iteratorを返すバージョンのみが提供されている。</b>
<b>アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。</b>



##戻り値

末尾要素の次を指す読み取り専用イテレータ



##例外

投げない


##計算量

定数時間


##例

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3};

  // このアルゴリズム内ではvの書き換えを決して行わない
  std::for_each(v.cbegin(), v.cend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cend[color ff0000]

###出力

```cpp
1
2
3
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```