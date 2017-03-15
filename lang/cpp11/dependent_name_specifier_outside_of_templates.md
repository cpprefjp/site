# 依存名に対するtypenameとtemplateの制限緩和
* cpp11[meta cpp]

## 概要
テンプレート内で、テンプレートパラメータに依存する名前を使用する場合には、`typename`キーワードを先頭に付ける必要がある。

テンプレート内で、推論できないテンプレートパラメータを持つメンバ関数を呼び出す場合には、メンバ関数名の前に`template`キーワードを付ける必要がある。

C++03まで、テンプレート外で`typename`と`template`を付けるとコンパイルエラーになっていたが、C++11では、テンプレート外で`typename`と`template`を付けることが許可された。

これは、テンプレート内とテンプレート外で、共通のコードを利用できるようにするためである。


## 例
```cpp
#include <vector>

struct X {
  template <int N>
  int get() const
  {
      return N;
  }
};

int main()
{
  typename std::vector<int>::iterator it; // OK

  int value = X().template get<3>(); // OK
}
```

### 出力
```
```

## 参照
- [CWG Issue 382. Allow `typename` outside of templates](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#382)
- [CWG Issue 468. Allow `::template` outside of templates](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#468)

