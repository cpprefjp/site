#コンストラクタ
```cpp
ostream_iterator(ostream_type& s);
ostream_iterator(ostream_type& s, const CharT* delimiter);
ostream_iterator(const ostream_iterator<T, CharT, Traits>& x) = default;
```

##ostream_iteratorオブジェクトの構築
- `ostream_iterator(ostream_type& s)`<br/>出力ストリームオブジェクトへの参照を受け取り、メンバ変数にそのオブジェクトへのポインタを保持する。区切り文字列はヌルとなる。
- `ostream_iterator(ostream_type& s, const CharT* delimiter)`<br/>出力ストリームオブジェクトへの参照を受け取り、メンバ変数にそのオブジェクトへのポインタを保持する。区切り文字列を受け取り、メンバ変数に保持する。


##例
```cpp
#include <iostream>
#include <iterator>
#include <algorithm> // copy
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3};

  // std::coutに出力。区切り文字列なし
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout));

  std::cout << std::endl;

  // std::coutに出力。区切り文字列は","
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, ","));
}
```

###出力
```
123
1,2,3,
```

##参照


