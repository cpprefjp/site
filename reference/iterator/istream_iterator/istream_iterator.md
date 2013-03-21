```cpp
istream_iterator();
istream_iterator(istream_type& s);
istream_iterator(const istream_iterator& x) = default;
```

##istream_iteratorの構築

- <b>istream_iterator()デフォルトコンストラクタ。メンバ変数として保持する入力ストリームへのポインタをヌル初期化する。デフォルトコンストラクタで構築されたistream_iteratorオブジェクトは、イテレータの終端値として使用できる。</b>
- <b>istream_iterator(istream_type& s)入力ストリームオブジェクトへの参照を受け取り、メンバ変数にそのオブジェクトへのポインタを保持する。operator*()で現在参照している値を返すために、この段階で入力ストリームから値を読み取り、メンバ変数に値を保持する。</b>


##例

```cpp
#include <iostream>
#include <iterator>
#include <sstream>
#include <algorithm> // for_each

int main()
{
  std::stringstream ss;
  ss << 1 << std::endl
     << 2 << std::endl
     << 3;

  std::istream_iterator<int> it(ss); // 入力ストリームオブジェクトへの参照を渡す
  std::istream_iterator<int> last;   // デフォルト構築。終端値として使用する

  std::for_each(it, last,  {
    std::cout << x << std::endl;
  });
}
```
* [link int x]

###出力

```cpp
1
2
3
```

##参照


