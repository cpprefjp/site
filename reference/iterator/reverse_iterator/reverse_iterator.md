#コンストラクタ
```cpp
reverse_iterator();
explicit reverse_iterator(Iterator x);
template <class U> reverse_iterator(const reverse_iterator<U>& u);
```

##reverse_iteratorの構築
`reverse_iterator`オブジェクトを、次に示す通りの要素で初期化する。
- `reverse_iterator()`<br/>デフォルトコンストラクタ。内容する元となるイテレータである`current`メンバ変数を、`Iterator`の初期化された値を使用して初期化する。
- `explicit reverse_iterator(Iterator x)`<br/>元となるイテレータ`x`を受け取り、メンバ変数`current`に保持する。
- `reverse_iterator(const reverse_iterator<U>& u)`<br/>`u.current`をメンバ変数`current`に保持する。<br/>要件： `U`が`Iterator`に変換可能であること


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end()); // 元となるイテレータで初期化
  std::reverse_iterator<decltype(v)::const_iterator> it2 = it1; // イテレータの変換
  std::reverse_iterator<decltype(v)::const_iterator> end(v.begin());

  for (; it2 != end; ++it2) {
    std::cout << *it2 << std::endl;
  }
}
```

###出力
```
3
2
1
```

##参照


