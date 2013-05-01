#crbegin
```cpp
const_reverse_iterator crbegin() const noexcept;
```

##概要

<b>最後尾の要素を指す読み取り専用逆イテレータを取得する。</b>
<b></b>
<b>[rbegin](/reference/vector/rbegin.md)()は非constなvectorオブジェクトに対してreverse_iteratorを返し、constなvectorオブジェクトに対してはconst_reverse_iteratorを返すが、crbegin()はconst_reverse_iteratorを返すバージョンのみが提供されている。</b>
<b>アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。</b>



##戻り値

最後尾の要素を指す読み取り専用逆イテレータ



##例外

投げない


##計算量

定数時間


##備考



##例

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3};

  // このアルゴリズム内ではvの書き換えを決して行わない
  std::for_each(v.crbegin(), v.crend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* crbegin[color ff0000]

###出力

```cpp
3
2
1
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