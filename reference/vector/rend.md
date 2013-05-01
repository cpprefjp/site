#rend
```cpp
reverse_iterator rend() noexcept;
const_reverse_iterator rend() const noexcept;
```

##概要

<b>先頭要素の前を指す逆イテレータを取得する。</b>


##戻り値

非`const`な文脈では`reverse_iterator`型で先頭要素の前を指す逆イテレータを返し、
`const`な文脈では`const_reverse_iterator`型で 先頭要素の前を指す逆イテレータを返す。



##例外

投げない


##計算量

定数時間


##備考



##例

```cpp
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3};
  const std::vector<int>& cv = v;

  decltype(v)::reverse_iterator i = v.rbegin();
  decltype(v)::reverse_iterator last = v.rend();

  decltype(v)::const_reverse_iterator ci = cv.rbegin();
  decltype(v)::const_reverse_iterator clast = cv.rend();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* rend[color ff0000]
* rend[color ff0000]

###出力

```cpp
3
2
1
3
2
1
```

<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```