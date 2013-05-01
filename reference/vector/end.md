#end
```cpp
iterator end() noexcept;
const_iterator end() const noexcept;
```

##概要

<b>末尾の次を指すイテレータを取得する。</b>


##戻り値

非`const`な文脈では`iterator`型で最後尾要素の次を指すイテレータを返し、
`const`な文脈では`const_iterator`型で 最後尾要素の次を指すイテレータを返す。



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

  decltype(v)::iterator i = v.begin();
  decltype(v)::iterator last = v.end();

  decltype(v)::const_iterator ci = cv.begin();
  decltype(v)::const_iterator clast = cv.end();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* end[color ff0000]
* end[color ff0000]

###出力

```cpp
1
2
3
1
2
3
```

<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```