# コンストラクタ
* typeinfo[meta header]
* std[meta namespace]
* type_info[meta class]
* function[meta id-type]

```cpp
type_info(const type_info& rhs) = delete;
```

## type_infoオブジェクトの構築
`type_info`クラスは、`typeid`演算�を使用することによってのみオブジェクトを生成できる。

ユーザーが`type_info`クラスをデフォルト構築、コピー、ムーブすることはできない。


## 例
```cpp example
#include <typeinfo>
 
int main()
{
  // デフォルト構築は不可能
  // std::type_info t0;

  // コピー(ムーブ)も不可能
  // std::type_info t1 = typeid(int);

  // const参照ならOK
  const std::type_info& rt = typeid(int);
}
```

### 出力
```
```

## 参照

