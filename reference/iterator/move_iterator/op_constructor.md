#コンストラクタ (C++11)
* iterator[meta header]
* std[meta namespace]

```cpp
move_iterator();

explicit move_iterator(Iterator i);
template <class U> move_iterator(const move_iterator<U>& u);
move_iterator(move_iterator&&) noexcept = default;
```

##move_iteratorの構築
`move_iterator`オブジェクトを、次に示す通りの要素で初期化する。

- `move_iterator()`

デフォルトコンストラクタ。内容する元となるイテレータの値を、`Iterator`の初期化された値を使用して初期化する。

- `explicit move_iterator(Iterator i)`

元となるイテレータを受け取り、メンバ変数に保持する。

- `move_iterator(const move_iterator<U>& u)`

`u.base()`をメンバ変数に保持する。

要件： `U`が`Iterator`に変換可能であること


##例
```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  // デフォルト構築
  std::move_iterator<decltype(v)::iterator> it1;

  // 元となるイテレータから構築
  std::move_iterator<decltype(v)::iterator> it2(v.begin());

  // 他のmove_iteratorオブジェクトからコピー構築
  std::move_iterator<decltype(v)::iterator> it3(it2);

  // 他のmove_iteratorオブジェクトからムーブ構築
  std::move_iterator<decltype(v)::iterator> it4 = std::move(it3);

  std::unique_ptr<int> p = *it4;
  std::cout << *p << std::endl;
}
```

###出力
```
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


